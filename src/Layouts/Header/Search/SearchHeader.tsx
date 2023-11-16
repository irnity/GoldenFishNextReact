import { type FunctionComponent, useState, useEffect, useRef } from 'react'
import {
  type DocumentData,
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore'
import { db } from '@/services/firebase/firebase'
import Image from 'next/image'
import Link from 'next/link'
import { PiMagnifyingGlassThin } from 'react-icons/pi'
import { type IProduct } from '@/redux/model'
import classes from './SearchHeader.module.css'
import CustomBackground from '@/components/elements/customBackground/CustomBackground'

interface SearchHeaderProps {}

const fetchProducts = async (searchInput: string) => {
  const productQuery = query(
    collection(db, 'products'),
    where('title', '>=', searchInput),
    where('title', '<=', searchInput + '\uf8ff'),
    limit(4)
  )

  const productResults = await getDocs(productQuery)
  const products: DocumentData[] = productResults.docs.map((doc) => doc.data())
  return products
}

const SearchHeader: FunctionComponent<SearchHeaderProps> = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<IProduct[]>([])
  const [searchResultsToggle, setSearchResultsToggle] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchInput.length === 0) {
        setSearchResults([])
      }
      if (searchInput.length > 0) {
        try {
          const data = await fetchProducts(searchInput)
          setSearchResultsToggle(true)
          setSearchResults(data as IProduct[])
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [searchInput])
  return (
    <div className={classes.search}>
      <div
        className={classes.searchIcon}
        onClick={() => {
          inputRef.current?.focus()
        }}
      >
        <PiMagnifyingGlassThin size={'100%'} />
      </div>

      <input
        type="text"
        placeholder="Я шукаю..."
        value={searchInput}
        onChange={searchHandler}
        ref={inputRef}
        onFocus={() => {
          setSearchResultsToggle(true)
        }}
      />
      {searchResults.length > 0 && searchResultsToggle && (
        <>
          <CustomBackground
            handler={() => {
              setSearchResultsToggle(false)
            }}
          />

          <div className={classes.searchResults}>
            {searchResults.map((result) => (
              <Link
                href={`/products/${result.category}/${result.code}`}
                onClick={() => {
                  setSearchResultsToggle(false)
                  setSearchInput('')
                  setSearchResults([])
                }}
                key={result.id}
                className={classes.item}
              >
                <Image
                  src={result.image}
                  alt={result.title}
                  width={200}
                  height={200}
                  className={classes.image}
                />
                <div className={classes.text}>
                  <span className={classes.titleName}>{result.title}</span>
                  <span className={classes.titlePrice}>
                    {result.price}
                    &#8372;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchHeader
