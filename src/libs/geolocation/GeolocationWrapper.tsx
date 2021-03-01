import React, { useContext, useEffect, useState } from 'react'
import { GeoCoordinates } from 'react-native-geolocation-service'

import { useAppStateChange } from 'features/offer/pages/useAppStateChange'
import { storage } from 'libs/storage'

import { checkGeolocPermission } from './checkGeolocPermission'
import { getPosition } from './getPosition'
import { GeolocPermissionState } from './permissionState.d'
import { requestGeolocPermission } from './requestGeolocPermission'

type RequestGeolocPermissionParams = {
  onAcceptance?: () => void
  onRefusal?: () => void
  onSubmit?: () => void
}

export interface IGeolocationContext {
  position: GeoCoordinates | null
  setPosition: (position: GeoCoordinates | null) => void
  permissionState: GeolocPermissionState
  requestGeolocPermission: (params?: RequestGeolocPermissionParams) => Promise<void>
  checkGeolocPermission: () => Promise<void>
  triggerPositionUpdate: () => void
}

export const GeolocationContext = React.createContext<IGeolocationContext>({
  position: null,
  setPosition: () => undefined,
  permissionState: GeolocPermissionState.DENIED,
  requestGeolocPermission: async () => {
    // nothing
  },
  checkGeolocPermission: async () => {
    // nothing
  },
  triggerPositionUpdate: () => undefined,
})

export const GeolocationWrapper = ({ children }: { children: Element }) => {
  const [position, setPosition] = useState<GeoCoordinates | null>(null)
  const [permissionState, setPermissionState] = useState<GeolocPermissionState>(
    GeolocPermissionState.DENIED
  )
  const [shouldComputePosition, setShouldComputePosition] = useState(0)

  useEffect(() => {
    contextualCheckPermission()
  }, [])

  // reset position every time user updates his choice on the app or in his phone settings
  // if user choice is not consistent with OS permissions, position is set to null
  useEffect(() => {
    if (shouldComputePosition === 0) return
    storage
      .readObject('has_allowed_geolocation')
      .then((hasAllowedGeolocation) => {
        if (permissionState === GeolocPermissionState.GRANTED && Boolean(hasAllowedGeolocation)) {
          getPosition(setPosition)
        } else {
          setPosition(null)
        }
      })
      .catch(() => setPosition(null))
  }, [shouldComputePosition])

  function triggerPositionUpdate() {
    setShouldComputePosition((previousValue) => previousValue + 1)
  }

  async function synchronizePermissionAndPosition(newPermissionState: GeolocPermissionState) {
    setPermissionState(newPermissionState)
    triggerPositionUpdate()
  }

  // this function is used to set OS permissions according to user choice on native geolocation popup
  async function contextualRequestGeolocPermission(params?: RequestGeolocPermissionParams) {
    const newPermissionState = await requestGeolocPermission()
    const isPermissionGranted = newPermissionState === GeolocPermissionState.GRANTED

    await storage.saveObject('has_allowed_geolocation', isPermissionGranted)
    synchronizePermissionAndPosition(newPermissionState)

    if (params?.onSubmit) {
      params.onSubmit()
    }
    if (isPermissionGranted && params?.onAcceptance) {
      params.onAcceptance()
    } else if (!isPermissionGranted && params?.onRefusal) {
      params.onRefusal()
    }
  }

  // in case user updates his preferences in his phone settings we check if his local
  // storage choice is consistent with phone permissions, and update position if not
  const contextualCheckPermission = async () => {
    const newPermissionState = await checkGeolocPermission()
    synchronizePermissionAndPosition(newPermissionState)
  }

  const onAppBecomeActive = async () => {
    await contextualCheckPermission()
  }
  const onAppBecomeInactive = async () => {
    // nothing
  }
  useAppStateChange(onAppBecomeActive, onAppBecomeInactive)

  return (
    <GeolocationContext.Provider
      value={{
        position,
        setPosition,
        permissionState,
        requestGeolocPermission: contextualRequestGeolocPermission,
        checkGeolocPermission: contextualCheckPermission,
        triggerPositionUpdate,
      }}>
      {children}
    </GeolocationContext.Provider>
  )
}

export function useGeolocation(): IGeolocationContext {
  return useContext(GeolocationContext)
}
