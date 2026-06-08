function PostCards(post, author) {
	return (
		<div className="author">
			<img
				src={post.author?.profileImage || '/user.svg'}
				alt="user"
				className="avatar"
			/>
			<h3>{post.author?.userName}</h3>
		</div>
	);
}


function ProfileCards(user) {
    <div className="profile">
				<img src={user?.safeUser?.profileImage || '/user.svg'} alt="user" className="avatar profilePic" />
			{user && <h2>{user.safeUser.userName}</h2>}
			<button className='settings' onClick={openSettings}>
				<i className="fa-solid fa-gear"></i>
				Settings
			</button>
			 {settingToggle && (
  <div className="settings-panel">
    {user?.safeUser?.isPublic ? (
      <button onClick={switchToPrivate}>Switch to private</button>
    ) : (
      <button onClick={switchToPublic}>Switch to public</button>
    )}
	<button onClick={changeProfilePic}>Upload profile picture</button>
	{uploadToggle && (
		<div>
			<form onSubmit={uploadProfilePic} encType='multipart/form-data'>
			<input type="file" accept="image/*" name="profilePic" />
			<button type="submit">Upload</button>
			</form>
		</div>
	)}
  </div>
)}
			</div>
}

export  {   PostCards, ProfileCards };