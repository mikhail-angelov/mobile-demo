import {
    NEW_MESSAGE,
    GET_CHATS,
    GET_CHATS_ERROR,
    SET_ACTIVE_CHAT,
    ADD_USER_TO_CHAT_LOCALY,
    DELETE_USER_FROM_CHAT_LOCALY,
    FIND_USERS,
    CREATE_NEW_CHAT,
    DELETE_ALL_USERS_FROM_CHAT_LOCALY,
    UPLOAD_PICTURES_IN_CHAT_START,
    UPLOAD_PICTURES_IN_CHAT_PROGRESS,
    UPLOAD_PICTURES_IN_CHAT_END,
    UPLOAD_CHAT_PHOTO_START,
    UPLOAD_CHAT_PHOTO_PROGRESS,
    UPLOAD_CHAT_PHOTO_END,
    REFRESH_CHATLIST_START,
    REFRESH_CHATLIST_END,
    GET_CHATLIST_TIMESTAMP,
    ADD_PICTURE_IN_MESSAGE_LOCALY,
    DELETE_PICTURE_IN_MESSAGE_LOCALY,
    CLEAN_PICTURE_IN_MESSAGE_LOCALY,
    OPEN_SEARCH_BAR,
    CLOSE_SEARCH_BAR,
    CLEAR_USERS_SEARCH_RESULT,
    DEAUTH_USER,
    UPLOAD_AUDIO_IN_CHAT_START,
    UPLOAD_AUDIO_IN_CHAT_PROGRESS,
    UPLOAD_AUDIO_IN_CHAT_END,
    ADD_AUDIO_IN_MESSAGE_LOCALY,
    DELETE_AUDIO_IN_MESSAGE_LOCALY,
    CLEAN_AUDIO_IN_MESSAGE_LOCALY,
    CLEAN_CHAT,
    MESSAGES_REFRESH_START,
    MESSAGES_REFRESH_END,
    UPDATE_CHAT,
} from '../constants/actions'
import _ from 'lodash'
import { stat } from 'fs'

export const initialState = {
    chats: [],
    usersInNewChat: [],
    getChatsError: false,
    usersSearchResult: [],
    activeChat: {
        chatImage: '',
        chatName: '',
        chatColor: '',
        chatId: '',
    },
    uploadingPhotoProgress: 0,
    uploadingPhoto: false,
    refreshingChatList: false,
    lastChatsTimestamp: {},
    imagesInCurrentMessage: [],
    audiosInCurrentMessage: [],
    chatRefreshing: false,
}

const chat = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS: {
            const chats = action.payload
            return { ...state, chats, getChatsError: false }
        }
        case GET_CHATS_ERROR: {
            return { ...state, getChatsError: true }
        }
        case SET_ACTIVE_CHAT: {
            return { ...state, activeChat: { ...action.payload } }
        }
        case NEW_MESSAGE: {
            const indexChat = _.findIndex(state.chats, o => {
                return o.chatId === action.payload.chatId
            })
            const updChat = {
                ...state.chats[indexChat],
                lastMessageTimestamp: action.payload.timestamp,
                lastMessageText: action.payload.text,
                lastMessageAuthorId: action.payload.author._id,
                lastMessageAuthor: action.payload.author.name,
            }
            const filteredChats = _.filter(state.chats, el => el.chatId !== updChat.chatId)
            return { ...state, chats: [...filteredChats, updChat] }
        }
        case DELETE_ALL_USERS_FROM_CHAT_LOCALY: {
            return { ...state, usersInNewChat: [] }
        }
        case CLEAR_USERS_SEARCH_RESULT: {
            return { ...state, usersSearchResult: [] }
        }
        case FIND_USERS: {
            return {
                ...state,
                usersSearchResult: action.payload,
            }
        }
        case ADD_USER_TO_CHAT_LOCALY: {
            const updateUsersInNewChat = [...state.usersInNewChat, action.payload]
            const updateUsers = _.filter(state.usersSearchResult, user => user._id !== action.payload._id)
            return { ...state, usersInNewChat: updateUsersInNewChat, users: updateUsers }
        }
        case DELETE_USER_FROM_CHAT_LOCALY: {
            const updateUsers = [...state.usersSearchResult, action.payload]
            const updateUsersInNewChat = _.filter(state.usersInNewChat, user => user._id !== action.payload._id)
            return { ...state, usersInNewChat: updateUsersInNewChat, users: updateUsers }
        }
        case CREATE_NEW_CHAT: {
            const updateChats = [...state.chats, action.payload]
            return { ...state, chats: updateChats }
        }
        case UPLOAD_PICTURES_IN_CHAT_START: {
            return { ...state, uploadingPhotoInChat: true }
        }
        case UPLOAD_PICTURES_IN_CHAT_END: {
            return { ...state, uploadingPhotoInChat: false, uploadingPhotoInChatProgress: 0 }
        }
        case UPLOAD_PICTURES_IN_CHAT_PROGRESS: {
            return { ...state, uploadingPhotoInChatProgress: action.payload }
        }
        case UPLOAD_CHAT_PHOTO_START: {
            return { ...state, uploadingChatPhoto: true }
        }
        case UPLOAD_CHAT_PHOTO_END: {
            return { ...state, uploadingChatPhoto: false, uploadingChatPhotoProgress: 0 }
        }
        case UPLOAD_CHAT_PHOTO_PROGRESS: {
            return { ...state, uploadingChatPhotoProgress: action.payload }
        }
        case GET_CHATLIST_TIMESTAMP: {
            return { ...state, lastChatsTimestamp: action.payload }
        }
        case REFRESH_CHATLIST_START: {
            return { ...state, refreshingChatList: true }
        }
        case REFRESH_CHATLIST_END: {
            return { ...state, refreshingChatList: false }
        }
        case MESSAGES_REFRESH_START: {
            return { ...state, chatRefreshing: true }
        }
        case MESSAGES_REFRESH_END: {
            return { ...state, chatRefreshing: false }
        }
        case ADD_PICTURE_IN_MESSAGE_LOCALY: {
            return { ...state, imagesInCurrentMessage: [...state.imagesInCurrentMessage, action.payload] }
        }
        case CLEAN_PICTURE_IN_MESSAGE_LOCALY: {
            return { ...state, imagesInCurrentMessage: [] }
        }
        case DELETE_PICTURE_IN_MESSAGE_LOCALY: {
            const newImagesInCurrentMessage = _.filter(state.imagesInCurrentMessage, imageUrl => imageUrl !== action.payload)
            return { ...state, imagesInCurrentMessage: newImagesInCurrentMessage }
        }
        case OPEN_SEARCH_BAR: {
            return { ...state, isSearchBarActive: true }
        }
        case CLOSE_SEARCH_BAR: {
            return { ...state, isSearchBarActive: false }
        }
        case DEAUTH_USER: {
            return { ...initialState }
        }
        case UPLOAD_AUDIO_IN_CHAT_PROGRESS: {
            return { ...state, uploadingAudioInChatProgress: action.payload }
        }
        case UPLOAD_AUDIO_IN_CHAT_START: {
            return { ...state, uploadingChatAudio: true }
        }
        case UPLOAD_AUDIO_IN_CHAT_END: {
            return { ...state, uploadingChatAudio: false, uploadingChatAudioProgress: 0 }
        }
        case ADD_AUDIO_IN_MESSAGE_LOCALY: {
            return { ...state, audiosInCurrentMessage: [...state.audiosInCurrentMessage, action.payload] }
        }
        case CLEAN_AUDIO_IN_MESSAGE_LOCALY: {
            return { ...state, audiosInCurrentMessage: [] }
        }
        case DELETE_AUDIO_IN_MESSAGE_LOCALY: {
            const newAudiosInCurrentMessage = _.filter(state.audiosInCurrentMessage, audioUrl => audioUrl !== action.payload)
            return { ...state, audiosInCurrentMessage: newAudiosInCurrentMessage }
        }
        case CLEAN_CHAT: {
            return { ...state, audiosInCurrentMessage: [], imagesInCurrentMessage: [] }
        }
        case UPDATE_CHAT: {
            return { ...state, activeChat: { ...state.activeChat, ...action.payload } }
        }
        default: {
            return state
        }
    }
}

export default chat
