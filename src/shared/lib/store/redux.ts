import {useDispatch, useSelector } from 'react-redux'
import {mainStore} from "../../../app/stores";

type RootState = ReturnType<typeof mainStore.getState>
type AppDispatch = typeof mainStore.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()