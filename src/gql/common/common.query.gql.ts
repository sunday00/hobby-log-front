import { gql } from '@apollo/client'
import { hobby } from '@/gql/types'

export const monthlyHobbyQuery = gql`
    query MonthlyHobby($yyyy: String, $mm: String) {
        monthHobby (yyyy: $yyyy, mm: $mm) {
            ${Object.keys(hobby).join(' ')}
        }
    }
`

export const monthlyNonActivateQuery = gql`
    query NonActivate($yyyy: String, $mm: String) {
        monthNonActiveHobby (yyyy: $yyyy, mm: $mm) {
            ${Object.keys(hobby).join(' ')}
        }
    }
`
