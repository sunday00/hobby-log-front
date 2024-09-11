import { gql } from '@apollo/client'
import { hobby } from '@/gql/types'

const { subImages: _subImages, ...hobbyProds } = hobby

export const monthlyHobbyQuery = gql`
    query MonthlyHobby($yyyy: String, $mm: String) {
        monthHobby (yyyy: $yyyy, mm: $mm) {
            ${Object.keys(hobbyProds).join(' ')}
        }
    }
`

export const monthlyNonActivateQuery = gql`
    query NonActivate($yyyy: String, $mm: String) {
        monthNonActiveHobby (yyyy: $yyyy, mm: $mm) {
            ${Object.keys(hobbyProds).join(' ')}
        }
    }
`

export const yearlyHobbyQuery = gql`
    query YearlyHobby($yyyy: String, $category: Category) {
        yearByCategory(yyyy: $yyyy, category: $category) {
            ${Object.keys(hobbyProds).join(' ')}
        }
    }
`

export const searchHobbiesQuery = gql`
    query SearchHobbies($search: String, $page: Long = 1, $category: Category) {
        searchHobby(search: $search, page: $page, category: $category) {
            hobbies {
                ${Object.keys(hobbyProds).join(' ')}
            }
            totalCount
        }
    }
`
