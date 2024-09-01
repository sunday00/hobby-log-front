import { MovieSearchForm } from '@/app/hobby/category/movie/create/(components)/movie.search.form'
import React, { useState } from 'react'
import { MovieSearchResults } from '@/app/hobby/category/movie/create/(components)/movie.search.results'

const MovieSearchBase = () => {
  const [search, setSearch] = useState('')
  const [searchSubmit, setSearchSubmit] = useState('')
  const [movieRaws, setMovieRaws] = useState([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
        <MovieSearchResults search={searchSubmit} />
      ) : (
        <></>
      )}
    </section>
  )
}

export { MovieSearchBase }
