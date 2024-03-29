import React, { useEffect } from 'react'
import { Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { discord, github, google } from '../../actions/socialActions'
import { socialLogin } from '../../actions/userActions'
const baseURL = process.env.REACT_APP_BASE_API_URL || 'http://127.0.0.1:8000';
function SocialScreen() {

    const { socialParams } = useParams()

    const discordLogin = () => {
        const discordBaseURL = 'https://discord.com/api/oauth2'
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_DISCORD_KEY
        const redirectURI = `${baseURL}/login/discord`
        const getCodeURL = `${discordBaseURL}/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=code&scope=email%20identify`

        window.location.assign(getCodeURL)
    }

    const githubLogin = () => {
        const githubBaseURL = 'https://github.com/login/oauth'
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_GITHUB_KEY
        const redirectURI = `${baseURL}/login/github`
        const getCodeURL = `${githubBaseURL}/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user`

        window.location.assign(getCodeURL)
    }

    const googleLogin = () => {
        const googleBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth'
        const clientID = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
        const redirectURI = `${baseURL}/login/google-oauth2`
        const getCodeURL = `${googleBaseURL}?redirect_uri=${redirectURI}&prompt=consent&response_type=code&client_id=${clientID}&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline`

        window.location.assign(getCodeURL)
    }

    const dispatch = useDispatch()
    
    const [searchParams] = useSearchParams()
    const code = searchParams.get('code')

    useEffect(() => {
        if(socialParams === 'discord'){
            dispatch(discord(code))
        }else if (socialParams === 'github'){
            dispatch(github(code))
        }
        else if (socialParams === 'google-oauth2'){
            dispatch(google(code))
        }
    }, [socialParams, dispatch, code])

    const {
        socialReducers: { social }
    } = useSelector((state) => state)

    useEffect(() => {
        if(social && social.access_token){
            dispatch(socialLogin(socialParams, social.access_token))
        }
    }, [dispatch, social, socialParams])

    return (
        <>
            <Row className='pt-3 justify-content-evenly'>
              
            </Row>
        </>
    )
}

export default SocialScreen
