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
const pkgName = '@geek-tim/base-ui'

;(async function main() {
  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`
  })

  if (!yes) return

  step(`\nRunning ${pkgName} tests...`)
  await run('yarn', ['workspace', `${pkgName}`, 'test'])

  step(`\nBuilding ${pkgName}...`)
  await run('yarn', ['workspace', `${pkgName}`, 'build'])

  step(`\n4. Bump version in package.json: `)
  step(`\nUpdate ${pkgName} version...`)
  await run('yarn', [
    'workspace',
    `${pkgName}`,
    'version',
    '--new-version',
    targetVersion,
    '--no-git-tag-version'
  ])

  step(`\nUpdating ${pkgName} cross dependencies...`)
  updatePackageVersion(targetVersion)

  // conventionalChangelog 生成变更日志
  step(`\n5. conventionalChangelog`)
  await run('yarn', ['changelog'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step(`\n6. Commit package.json and CHANGELOG.md files`)
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  step(`\n7. publish`)
  step(`\nPublishing ${pkgName} package...`)

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
  step('\n8.Tag')
  await runIfNotDry('git', ['tag', `v${targetVersion}`])

  step('\n9.Push')
  await runIfNotDry('git', [
    'push',
    'origin',
    `refs/tags/v${targetVersion}`,
    '--no-verify'
  ])
  await runIfNotDry('git', ['push', 'origin', 'master', '--no-verify'])

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
    if (key === `${pkgName}`) {
      dependencies[key] = version
    }
  })
}
