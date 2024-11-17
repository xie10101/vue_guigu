// 此文件内部添加对于提交代码命令的 规则设置：
// commitlint.config.cjs
export default {
  // 规则集配置
  rules: {
    // 规则：“type-enum” 确保提交类型符合预设的枚举值
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复
        "docs", // 文档变更
        "style", // 格式（不影响代码运行的变动）
        "refactor", // 重构（即不是新增功能，也不是修改bug的代码变动）
        "perf", // 性能改进
        "test", // 增加测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退到之前的版本
        "build", // 构建系统或外部依赖的变动
        "ci", // 持续集成的变动
        "wip", // 工作进行中的提交
      ],
    ],

    // 规则：“subject-full-stop” 确保提交信息的结尾没有句号
    "subject-full-stop": [0, "never"],

    // 规则：“subject-case” 确保提交信息遵循给定的字符大小写
    "subject-case": [0, "never"],
  },

  // 提交消息中必须存在的类型
  types: {
    feat: {
      description: "新功能",
      title: "Features",
      emoji: "✨",
      value: "feat",
    },
    fix: {
      description: "修复",
      title: "Bug Fixes",
      emoji: "🐛",
      value: "fix",
    },
    // ... 其他类型
  },

  // 作用域的配置
  scopes: [
    "accounts",
    "admin",
    "hooks",
    // ... 其他作用域
  ],

  // 如果规则违反，应该报告的错误级别
  defaultIgnores: true,
  extends: ["@commitlint/config-conventional"],
};
