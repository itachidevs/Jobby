import './index.css'

const Profile = props => {
  const {profileData} = props
  const {name, profileImageUrl, shortBio} = profileData

  return (
    <div className="profile-container">
      <img src={profileImageUrl} alt="profile" className="profile-image" />
      <h1 className="profile-name">{name}</h1>
      <p className="profile-bio">{shortBio}</p>
    </div>
  )
}

export default Profile
