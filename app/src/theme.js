import { createMuiTheme } from '@material-ui/core/styles';
import { red, indigo  } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: indigo,
    secondary: red,
  },
  typography: {
    fontFamily: [
      '"Baloo Paaji 2"',
      '"Kosugi Maru"',
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
  },
});
