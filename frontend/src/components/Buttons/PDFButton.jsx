import { Button } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { generateAccountsPDF } from "../../scripts/generatePDF"
import { useAccounts } from "../../hooks/useAccounts"

export default function PdfButton() {
  const { data: accounts = [] } = useAccounts()

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<FontAwesomeIcon icon={faFilePdf} />}
      onClick={() => generateAccountsPDF(accounts)}
    >
      Export PDF
    </Button>
  )
}
