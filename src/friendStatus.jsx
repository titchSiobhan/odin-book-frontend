function getFriendStatus(me, them) {
  if (!me || !them) return "none";

  if (me.safeUser.id === them.id) return "self";

  const friends = me.safeUser.friends || [];
  const sent = me.safeUser.sentRequests || [];
  const received = me.safeUser.receivedRequests || [];

  const isFriend = friends.some(f =>
    (f.requesterId === me.safeUser.id && f.receiverId === them.id && f.status === "accepted") ||
    (f.receiverId === me.safeUser.id && f.requesterId === them.id && f.status === "accepted")
  );
  if (isFriend) return "friends";

  const pendingSent = sent.some(r =>
    r.receiverId === them.id && r.status === "pending"
  );
  if (pendingSent) return "pending_sent";

  const pendingReceived = received.some(r =>
    r.requesterId === them.id && r.status === "pending"
  );
  if (pendingReceived) return "pending_received";

  return "none";
}


 export {getFriendStatus}