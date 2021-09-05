const { prompt } = require('enquirer')
const path = require('path')
const fs = require('fs')
const args = require('minimist')(process.argv.slice(2))
const targetVersion = args.v
const execa = require('execa')
const chalk = require('chalk')
const isDryRun = args.dry

const step = msg => console.log(chalk.cyan(msg))
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(chalk.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run

;(async function main() {
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) return

  step('\nRunning base-ui tests...')
  await run('yarn', ['workspace', 'base-ui', 'test'])

  step('\nBuilding base-ui...')
  await run('yarn', ['workspace', 'base-ui', 'build'])

  step('\nUpdate base-ui version...')
  await run('yarn', [
    'workspace',
    'base-ui',
    'version',
    '--new-version',
    targetVersion,
    '--no-git-tag-version'
  ])

  step('\nUpdating base-ui cross dependencies...')
  updatePackageVersion(targetVersion)

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  step('\nPublishing base-ui package...')

  await runIfNotDry(
    'yarn',
    [
      'publish',
      '--new-version',
      targetVersion,
      '--registry',
      'https://registry.npmjs.org',
      '--access',
      'public'
    ],
    {
      cwd: path.resolve(__dirname, '../packages/base-ui'),
      stdio: 'pipe'
    }
  )

  step('\nPushing to GitHub...')
  await runIfNotDry('git', ['tag', `v${targetVersion}`])
  await runIfNotDry('git', [
    'push',
    'origin',
    `refs/tags/v${targetVersion}`,
    '--no-verify'
  ])
  await runIfNotDry('git', ['push', 'origin', 'master', '--no-verify'])

  console.log()
  console.log(chalk.green(`Successfully published v${targetVersion}`))
})()

function updatePackageVersion(version) {
  getPackagePath().forEach(pkgPath => {
    const pkg = JSON.parse(fs.readFileSync(pkgPath))
    updateDeps(pkg, 'dependencies', version)
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
  })
}

function getPackagePath() {
  const pkgRoot = path.resolve(__dirname, '../packages')
  const packages = fs.readdirSync(pkgRoot).filter(name => !name.startsWith('.'))

  return packages.map(packageName =>
    path.resolve(pkgRoot, packageName, 'package.json')
  )
}

function updateDeps(packageJson, depType, version) {
  const dependencies = packageJson[depType]
  if (!dependencies) return

  Object.keys(dependencies).forEach(key => {
    if (key === 'base-ui') {
      dependencies[key] = version
    }
  })
}
