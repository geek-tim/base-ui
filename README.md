# base-ui

## 如何贡献

非常欢迎你的加入！提一个 Issue 或者提交一个 Pull Request。

## Pull Request:

Fork 代码!

- 创建自己的分支: git checkout -b feat/xxxx
- 提交你的修改: git commit -am 'feat(function): add xxxxx'
- 推送您的分支: git push origin feat/xxxx
- 提交 pull request

## Git 贡献提交规范

参考 vue 规范 (Angular)

- feat 增加新功能
- fix 修复问题/BUG
- style 代码风格相关无影响运行结果的
- perf 优化/性能提升
- refactor 重构
- revert 撤销修改
- test 测试相关
- docs 文档/注释
- chore 依赖更新/脚手架配置修改等
- workflow 工作流改进
- ci 持续集成
- types 类型定义文件更改
- wip 开发中

### Recommended workflow

1. Make changes
2. Commit those changes
3. Make sure Travis turns green

4. Bump version in package.json
5. conventionalChangelog
6. Commit package.json and CHANGELOG.md files
7. publish

8. Tag
9. Push

The reason why you should commit and tag after conventionalChangelog is that the CHANGELOG should be included in the new release, hence gitRawCommitsOpts.from defaults to the latest semver tag.

#### With npm version

Using the npm scripts to our advantage with the following hooks:

```
{
  "scripts": {
    "version": "conventional-changelog -p angular -i CHANGELOG.md -s && git add CHANGELOG.md"
  }
}
```

You could follow the following workflow

1. Make changes
2. Commit those changes
3. Pull all the tags
4. Run the npm version [patch|minor|major] command
5. Push
