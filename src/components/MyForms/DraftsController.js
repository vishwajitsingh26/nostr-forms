import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"

export const DraftsController =() => {
    const { encodedForm } = useParams();
    const draft = JSON.parse(window.atob(encodedForm))
    console.log("Btoa", encodedForm, draft, draft.formSpec)
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/forms/new", { state: { formSpec: draft.formSpec, tempId: draft.tempId }});
    }, [draft, navigate])
    
}