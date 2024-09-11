import { gql } from '@apollo/client'
import { draw, imageEntity } from '@/gql/types'

const { subImages: _subImages, ...drawProps } = draw

export const getOneDrawQuery = gql`
    query GetOneDraw($id: String) {
        getOneDraw(id: $id) {
            ${Object.keys(drawProps).join(' ')}
        }
    }
`

export const getOneDrawWithSubImagesQuery = gql`
    query GetOneDraw($id: String) {
        getOneDraw(id: $id) {
            ${Object.keys(drawProps).join(' ')}
            subImages {
                ${Object.keys(imageEntity).join(' ')}
            }
        }
    }
`
