import { useNavigate } from "react-router-dom"

export default function PassportContainerVm() {
    const navigate = useNavigate()
    return {navigate}
}
