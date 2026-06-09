function DeletePost({
	postId,
	user,
	setPosts,
	authFetch,
	post,
	postSettingsId,
	setPostSettingsId,
}) {
	function openPostSettings(postId) {
		setPostSettingsId((prev) => (prev === postId ? null : postId));
	}

	async function deletePost(postId) {
		await authFetch(`http://localhost:3000/post/delete/${postId}`, {
			method: 'DELETE',
		});
		setPosts((prev) => prev.filter((post) => post.id !== postId));
	}

	return (
		<>
			<div className="delete-post">
				{user && user.safeUser.id === post.author.id && (
					<p onClick={() => openPostSettings(post.id)}>
						<i className="fa-solid fa-gear"></i>
					</p>
				)}
				{postSettingsId === post.id && post.author.id === user.safeUser.id && (
					<p onClick={() => deletePost(post.id)}>
						<i className="fa-solid fa-trash-can"></i>
					</p>
				)}
			</div>
		</>
	);
}

export default DeletePost;
