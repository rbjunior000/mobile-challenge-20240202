import { ActionsheetItemText, Box } from '@/components/ui'
import { AlertCircle } from 'lucide-react'

export const NotFoundWord = () => {
  return (
    <>
      <Box className="flex w-full items-center space-x-3 p-4 rounded-lg">
        <Box className="flex items-center justify-center">
          <AlertCircle className="text-red-500 w-6 h-6" />
          <Box>
            <ActionsheetItemText className="text-center text-red-600 font-bold">Word not found</ActionsheetItemText>
            <ActionsheetItemText className="text-center text-gray-600">Please try with another word</ActionsheetItemText>
          </Box>
        </Box>
      </Box>
    </>
  )
}
