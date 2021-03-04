import React from 'react'
import axios from 'axios'

import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'


const useActionButton = (token, reloadFunc, url) => {

    const [ pressedBtn, setPressedBtn ] = React.useState(false);

    const request = async() => {
        setPressedBtn(true)
        await axios.get(`${APIROOTURL}/${url}/`,{
            headers: {
              'Authorization': `Token ${token}`, 
            }
          }).then(res => {
          }).catch(err => {
            console.log(err)
          })
          reloadFunc()
        }

        return {
            request, pressedBtn, setPressedBtn
        }
}

export default useActionButton