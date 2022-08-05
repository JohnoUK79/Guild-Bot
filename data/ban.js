const banIds = [
    '742226152742977616'
  ];
  
  const randomReply = [
    "Don't play with me... 'cause you're playing with fire",
    "A wave loudly clashing against a long shoreline welcomes spring!",
    "Chair number eleven is nonsensical, much like me.",
    "Everything and more could please even the most demanding follower of Freud.",
    "A river a thousand paces wide likes to have a shower in the morning.",
    "Everything and more is often one floor above you.",
    "It was 5:30 in the morning, and you had rambled on for 18 pages. Front and back!"
  ];
  
  function isBanned(userID) {
    return (banIds.indexOf(userID) === -1);
  }
  
  function replyRandom(userID, channelID) {
    return lib.discord.channels['@0.0.6'].messages.create({
      channel_id: channelID,
      content: [
        `Hey <@!${userID}>!`,
        randomReply[Math.floor(Math.random() * randomReply.length)]
      ].join('\n')
    });
  }
  
  
  async function banned(userID, channelID) {
    let ret = false;
    if( !isBanned(userID) ) {
      const rand = Math.random();
      if( rand > 0.4 ) {
        await replyRandom(userID, channelID);
      }
      ret = true;
    }
    return new Promise((Resolve, reject) => Resolve(ret));
  }
  
  module.exports = {
    isBanned:    isBanned,
    replyRandom: replyRandom,
    banned:      banned
  }