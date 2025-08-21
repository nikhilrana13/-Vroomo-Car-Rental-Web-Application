import CarDetailCard from '@/Components/pagecomponents/CarDetailCard'
import Navbar from '@/Components/pagecomponents/Navbar'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCars } from '@/Redux/CarSlice'
import CarDetailCardSkeleton from '@/Components/pagecomponents/CarDetailCardSkeleton'
import Footer from '@/Components/pagecomponents/Footer'

const FindCars = () => {
    const [SelectedCategory, setSelectedCategory] = useState([])
    const [filters, SetFilters] = useState([])
    const [SelectedFueltype, SetSelectedFueltype] = useState([])
    const dispatch = useDispatch()
    const { Cars, loading } = useSelector((state) => state.Car)
    const AvailableCars = Cars.filter((Car) => Car.status === "Available")
    // fetch cars
    useEffect(() => {
        dispatch(fetchCars())
    }, [dispatch])
    //  handle select category
    const handleSelectCategory = (e) => {
        const value = e.target.value
        setSelectedCategory((prev) => {
            if (prev.includes(value)) {
                return prev.filter((categroy) => categroy !== value)
            } else {
                return [...prev, value]
            }
        })
    }
    //  handle fueltype
    const handleSelectFueltype = (e) => {
        const value = e.target.value
        SetSelectedFueltype((prev) => {
            if (prev.includes(value)) {
                return prev.filter((Fueltype) => Fueltype !== value)
            } else {
                return [...prev, value]
            }
        })
    }
    //  handle filter change
    useEffect(() => {
        let filteredCars = AvailableCars
        // filter by category
        if (SelectedCategory.length > 0) {
            filteredCars = filteredCars.filter((car) => SelectedCategory.includes(car.Category))
        }
        // filter by fueltype
        if (SelectedFueltype.length > 0) {
            filteredCars = filteredCars.filter((car) => SelectedFueltype.includes(car.fueltype))
        }
        SetFilters(filteredCars)
    }, [SelectedCategory, Cars, SelectedFueltype])

    // console.log("filters",filters)
    // handle sorting 
    const HandleSorting = (e) => {
        const value = e.target.value
        let sortedCars = [...filters]
        if (value === 'lowtohigh') {
            sortedCars.sort((a, b) => a.Dailyprice - b.Dailyprice)
            SetFilters(sortedCars)
        } else if (value === 'hightolow') {
            sortedCars.sort((a, b) => b.Dailyprice - a.Dailyprice)
            SetFilters(sortedCars)
        } else if (value === 'sortbyrelevant') {
            // Simply reset to current filtered data without any sorting
            let resetCars = [...filters].sort((a, b) => {
            // Sort by car ID or creation date for consistent "relevant" order
                return a._id.localeCompare(b._id)
            })
            SetFilters(resetCars)
        }
    }
    return (
        <div className='w-full px-[2vw] py-2 sm:px-[4vw] sm:py-3'>
            <Navbar />
            <div className='flex flex-col mt-[5rem] mb-5 sm:flex-row gap-1 min-h-screen sm:gap-10 '>
                <div className='min-w-80 border py-9 bg-[#F6F6F6] rounded-md'>
                    <div className='flex flex-col border-b p-5'>
                        <p className='my-2 text-[1.5rem] font-[500]'>
                            Filter by
                        </p>
                        <div className=' border-gray-300 py-5  mt-3 text-black'>
                            <h4 className='mb-3 text-[1.4rem] font-[600]'>VEHICLE CATEGORIES</h4>
                            <div className='flex flex-col gap-4 text-sm font-light text-black'>
                                <p className='flex gap-2'>
                                    <input onChange={handleSelectCategory} type="checkbox" value="Suv" />
                                    <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Suv</span>
                                </p>
                                <p className='flex gap-2'>
                                    <input onChange={handleSelectCategory} type="checkbox" value="Luxury" />
                                    <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Luxury</span>
                                </p>
                                <p className='flex gap-2'>
                                    <input onChange={handleSelectCategory} type="checkbox" value="Sedan" />
                                    <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Sedan</span>
                                </p>
                                <p className='flex gap-2'>
                                    <input onChange={handleSelectCategory} type="checkbox" value="Hatchback" />
                                    <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>HatchBack</span>
                                </p>
                                <p className='flex gap-2'>
                                    <input onChange={handleSelectCategory} type="checkbox" value="Van" />
                                    <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Van</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=' border-gray-300 p-5  text-black'>
                        <h4 className='mb-3 text-[1.4rem] font-[600]'>FUEL TYPES</h4>
                        <div className='flex flex-col gap-4 text-sm font-light text-black'>
                            <p className='flex gap-2'>
                                <input onChange={handleSelectFueltype} type="checkbox" value="Petrol" />
                                <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Petrol</span>
                            </p>
                            <p className='flex gap-2'>
                                <input onChange={handleSelectFueltype} type="checkbox" value="Diesel" />
                                <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Diesel</span>
                            </p>
                            <p className='flex gap-2'>
                                <input onChange={handleSelectFueltype} type="checkbox" value="Electric" />
                                <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Electric</span>
                            </p>
                            <p className='flex gap-2'>
                                <input onChange={handleSelectFueltype} type="checkbox" value="Cng" />
                                <span className='text-[1rem] sm:text-[1.2rem] font-[500]'>Cng</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex-1 '>
                    <div className=' flex mt-5 flex-col gap-5 sm:flex-row justify-between px-5 '>
                        <h3 className='text-[1rem] md:text-[2rem] font-[500]'>{filters?.length || 0} Cars Available</h3>
                        <div className=''>
                            <select name="Sort" onChange={HandleSorting} className=' text-[1rem] font-[500] rounded-md border py-4 px-3'>
                                <option value='sortbyrelevant'>Sort by : Relevant</option>
                                <option value='lowtohigh'>Sort by : Low to High</option>
                                <option value='hightolow'> Sort by : High to Low</option>
                            </select>
                        </div>
                    </div>
                    {
                        loading ? (
                            <div className='grid grid-cols-1 lg:grid-cols-3  gap-8 mt-3'>
                                {
                                    [...Array(6)].map((_, index) => {
                                        return (
                                            <CarDetailCardSkeleton key={index} />
                                        )
                                    })
                                }

                            </div>
                        ) : filters?.length > 0 ? (
                            <div className='grid  grid-cols-1  lg:grid-cols-3 gap-8 mt-3'>
                                {
                                    filters?.map((car) => {
                                        return (
                                            <CarDetailCard key={car._id} Car={car} />
                                        )
                                    })
                                }

                            </div>
                        ) : (
                            <p className='text-center mt-20 mx-auto text-[1.5rem] text-gray-500'>No Cars found</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default FindCars