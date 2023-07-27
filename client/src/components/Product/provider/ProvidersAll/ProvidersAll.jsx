import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProvider } from '../../../../redux/actions/actions';
import { Link } from "react-router-dom";

export const ProvidersAll = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(getProvider())}, []);
    const provider = useSelector((state) => state.provider);
    console.log(provider)
  return (
    <div>ProvidersAll</div>
  )
}
