import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SHOW_LOADING_ANIM_TIME } from '../../app/const'
import { album } from '../../album/album'
import { cover } from '../../album/cover'
import { settings } from '../../album/settings'
import { GeekPhoto, GeekSettings } from '../../app/types'

export interface AlbumSliceState {
  cover: GeekPhoto
  photos: GeekPhoto[]
  settings: GeekSettings
  loading: boolean
  slideShow: boolean
  selectedPhoto?: number | undefined
  error: string | null
}

const initialState: AlbumSliceState = {
  cover: cover as GeekPhoto,
  photos: album as GeekPhoto[],
  settings: settings,
  loading: true,
  slideShow: false,
  error: null
}

export const hideLoadingAsync = createAsyncThunk('album/hideLoading', async () => new Promise<undefined>((resolve) => setTimeout(() => resolve(undefined), SHOW_LOADING_ANIM_TIME)))


export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbum: (state, action: PayloadAction<{ cover: GeekPhoto, photos: GeekPhoto[] }>) => {
      state.cover = action.payload.cover
      state.photos = action.payload.photos
    },
    setStatus: (state, action: PayloadAction<{ loading: boolean, error: string | null }>) => {
      state.loading = action.payload.loading
      state.error = action.payload.error
    },
    setSelectedPhoto: (state, action: PayloadAction<number | undefined>) => {
      state.selectedPhoto = action.payload
    },
    goToNextPhoto: (state) => {
      state.selectedPhoto = state.selectedPhoto !== undefined && state.selectedPhoto < state.photos.length - 1 ? state.selectedPhoto + 1 : 0
    },
    goToPrevPhoto: (state) => {
      state.selectedPhoto = state.selectedPhoto !== undefined && state.selectedPhoto > 0 ? state.selectedPhoto - 1 : state.photos.length - 1
    },
    setSlideShow: (state, action: PayloadAction<boolean>) => {
      state.slideShow = action.payload
    },
  }, extraReducers: (builder) => {
    builder.addCase(hideLoadingAsync.fulfilled, (state) => {
      state.loading = false
    }).addCase(hideLoadingAsync.rejected, (state) => {
      state.loading = false
    }).addCase(hideLoadingAsync.pending, (state) => {
      state.loading = true
    })
  }
})

export const { setStatus, setSlideShow, setSelectedPhoto, goToNextPhoto, goToPrevPhoto } = albumSlice.actions
export const selectCover = (state: { album: AlbumSliceState }) => state.album.cover
export const selectTitle = (state: { album: AlbumSliceState }) => state.album.cover.title
export const selectPhotos = (state: { album: AlbumSliceState }) => state.album.photos
export const selectLoading = (state: { album: AlbumSliceState }) => state.album.loading
export const selectSlideShow = (state: { album: AlbumSliceState }) => state.album.slideShow
export const selectSettings = (state: { album: AlbumSliceState }) => state.album.settings
export const selectSelectedPhoto = (state: { album: AlbumSliceState }) => state.album.selectedPhoto
export default albumSlice.reducer
