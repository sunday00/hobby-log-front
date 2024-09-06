import { gql } from '@apollo/client'
import { series } from '@/gql/types'

export const essaySearchSeriesQuery = gql`
    query EssaySeriesSearch($search: String) {
        searchSeries(search: $search) {
            ${Object.keys(series).join(',')}
        }
    }
`
