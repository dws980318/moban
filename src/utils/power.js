const power = {
  meun: [
    {
      // path: "/admin/roleManagement",
      id: 1,
      name: "权限管理",
      children: [
        {
          id: 101,
          path: "/admin/roleManagement",
          name: "角色管理",
          children: [
            { name: "新建角色", id: 1001 },
            { name: "导出角色", id: 1002 },
            { name: "编辑角色权限", id: 1003 },
            { name: "删除角色", id: 1004 }
          ]
        },
        {
          id: 102,
          path: "/admin/administrator",
          name: "管理员账号管理",
          children: [
            { name: "新建管理员", id: 1005 },
            { name: "导出 管理员账号", id: 1006 },
            { name: "编辑管理员权限", id: 1007 },
            { name: "编辑管理员信息", id: 1008 },
            { name: "删除管理员", id: 1009 }
          ]
        },
        {
          id: 103,
          path: "/admin/examinee",
          name: "考生账号管理",
          children: [
            { name: "新建考生", id: 1010 },
            { name: "导出考生", id: 1011 },
            { name: "查看考生注册信息", id: 1012 },
            { name: "编辑考生密码", id: 1013 },
            { name: "删除考生", id: 1014 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "考试管理",
      children: [
        {
          id: 201,
          path: "/admin/examination",
          name: "考试管理",
          children: [
            { name: "新建考试", id: 2001 },
            { name: "发布考试", id: 2002 },
            { name: "打印成绩查询", id: 2003 },
            { name: "打印合格证", id: 2004 },
            { name: "查看详情", id: 2005 },
            { name: "编辑考试", id: 2006 },
            { name: "删除考试", id: 2007 },
            { name: "考试列表", id: 2008 }
          ]
        },
        {
          path: "/admin/informationCollect",
          id: 202,
          name: "信息采集模板管理"
        },
        { path: "/admin/professional", id: 203, name: "专业管理" },
        { path: "/admin/subject", id: 204, name: "科目管理" },
        { path: "/admin/academy", id: 205, name: "学院管理" }
      ]
    },
    {
      id: 3,
      name: "考场管理",
      children: [{ path: "/admin/signIn", id: 301, name: "考生签到管理" }]
    },
    {
      id: 4,
      name: "审核管理",
      children: [{ path: "/admin/check", id: 401, name: "信息采集管理" }]
    },
    {
      id: 5,
      name: "成绩管理",
      children: [
        { path: "/admin/performance", id: 501, name: "考生成绩管理" },
        { path: "/admin/finalist", id: 502, name: "入围成绩管理" }
      ]
    },
    {
      id: 6,
      name: "数据统计",
      children: [
        { path: "/admin/examineeData", id: 601, name: "考生数据统计" },
        { path: "/admin/Situation", id: 602, name: "考试情况统计" },
        { path: "/admin/Qualified", id: 603, name: "专业合格统计" },
        { path: "/admin/apply", id: 604, name: "报名统计" }
      ]
    },
    {
      id: 7,
      name: "信息管理",
      children: [
        { path: "/admin/inform", id: 701, name: "通知管理" },
        { path: "/admin/doorMessage", id: 702, name: "门户信息" }
      ]
    },
    {
      id: 8,
      name: "数据管理",
      children: [
        { path: "/admin/backup", id: 801, name: "数据备份" },
        { path: "/admin/recovery", id: 802, name: "数据恢复" }
      ]
    }
  ],
}

export default power
