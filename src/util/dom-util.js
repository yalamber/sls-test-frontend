// $('.ant-layout.ant-layout-has-sider > .ant-layout, .ant-layout.ant-layout-has-sider > .ant-layout-content').scrollTo(0,0)
const scrollToTop = (sel) => {
  sel = !sel ? ".ant-layout.ant-layout-has-sider > .ant-layout" : sel;
  document
    .querySelector(sel)
    .scrollTo(0, 0);
}

module.exports = {
  scrollToTop
}
