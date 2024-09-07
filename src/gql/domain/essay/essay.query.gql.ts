import { gql } from '@apollo/client'
import { essay, series } from '@/gql/types'

export const essaySearchSeriesQuery = gql`
    query EssaySeriesSearch($search: String) {
        searchSeries(search: $search) {
            ${Object.keys(series).join(' ')}
        }
    }
`

const { series: _s, ...essayField } = essay

export const getOneEssayQuery = gql`
    query GetOneEssayQuery($id: String) {
        getOneEssay(id: $id) {
            ${Object.keys(essayField).join(' ')}
            series {
                ${Object.keys(series).join(' ')}
            }
        }
    }
`