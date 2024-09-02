import { MovieSearchForm } from '@/app/hobby/category/movie/create/(components)/movie.search.form'
import React, { useState } from 'react'
import { MovieSearchResults } from '@/app/hobby/category/movie/create/(components)/movie.search.results'

const MovieSearchBase = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState<number>(1)
  const [searchSubmit, setSearchSubmit] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    setSearchSubmit(search)
  }

  return (
    <section>
      <MovieSearchForm
        handleSubmit={handleSubmit}
        search={search}
        setSearch={setSearch}
      />

      {searchSubmit.length ? (
        <MovieSearchResults
          search={searchSubmit}
          page={page}
          setPage={setPage}
        />
      ) : (
        <></>
      )}
    </section>
  )
}

export { MovieSearchBase }
