import { ButtonPropsVariantOverrides as Overrides } from "@mui/material/Button"

declare module "@mui/material/Button" {
  export interface ButtonPropsVariantOverrides extends Overrides {
    link: true
  }
}
