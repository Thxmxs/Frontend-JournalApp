import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { purpleTheme } from "./purpleTheme"

interface props{
    children:React.ReactElement
}

export const AppTheme : React.FC<props> = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}
