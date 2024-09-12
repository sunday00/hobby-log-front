import { gql } from '@apollo/client'

export const updateStatusMutation = gql`
  mutation UpdateStatus($input: UpdateStatusInput) {
    updateStatus(updateStatusInput: $input) {
      id
      success
    }
  }
`

export const addSubImageMutation = gql`
  mutation AddSubImage($input: AddSubImageInput) {
    addSubImage(addSubImageInput: $input) {
      id
      success
      message
    }
  }
`

export const deleteLogMutation = gql`
  mutation DeleteLog($category: Category, $id: String, $flag: String) {
    deleteLog(category: $category, id: $id, flag: $flag) {
      id
      success
    }
  }
`

export const deleteSubImageMutation = gql`
  mutation DeleteSubImage($path: String) {
    deleteImage(path: $path) {
      id
      success
    }
  }
`
