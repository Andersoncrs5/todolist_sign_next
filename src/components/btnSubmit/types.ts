import { ReactNode } from "react"

export default interface values {
    name?: string
    isSubmitting: boolean
    colorHover? : string
    padding?: string
    more?: string
    children?: ReactNode
}