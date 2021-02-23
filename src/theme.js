import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      marginTop: 10,
      marginBottom: 10
    },
  },
  palette: {
    primary: {
      light: '#EDEDED',
      main: '#939597',
      dark: '#6A6C6D',
    },
    secondary: {
      // light: '#cdcdcd',
      main: '#cd6d6d',
      // dark: '#676C72',
    },
    success: {
      main: '#839c57',
    },
    error: {
      main: '#cd6d6d',
    },
    danger: {
      main: '#FFCE2F',
    },
    // 使用 `getContrastText()` 来最大化
    // 背景和文本的对比度
    contrastThreshold: 3,
    // 使用下面的函数用于将颜色的亮度在其调色板中
    // 移动大约两个指数。
    // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
    tonalOffset: 0.2,
  },
});
export default theme;