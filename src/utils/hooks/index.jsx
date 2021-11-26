import { useState, useEffect } from 'react'

/**
 * Retrieves user information from API
 * @param {integer} userId - user id 
 * @returns {object} {isLoading, data, error} contain data request 
 * @returns {boolean} objectReturn.isLoading - data is loading ?
 * @returns {object} objectReturn.data = { mainData: <object>, activity: <array>, sessions: <array>, keyData: <object>, performances: <object>, score: <number>}
 * @returns {boolean} objectReturn.error - An error has occurred ?
 */
function useAxios(axiosGet, dataFunctionCallback) {
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState(false)
  const [axiosData, setAxiosData] = useState(false)

  useEffect(() => {
    if (!axiosGet){ 
        console.error("AxiosGet parameter is missing to perform the request !")
        return setDataError(true) 
    } else { 
        Promise.all(axiosGet)
            .then(setAxiosData)
            .catch((error) => {
                setDataError(true)
                console.error(error);
            });
        setDataLoading(false)
    }
  }, [axiosGet, dataFunctionCallback])
  return { dataLoading, dataError, axiosData }
}

export default useAxios