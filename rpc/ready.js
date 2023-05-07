const { LargeImage, LargeImageText, SmallImage, SmallImageText, Button1, Url1, Button2, Url2, State, Details } = require('../config.json');
module.exports = {
    name: 'ready',
    once: true,
    async execute(rpc_client) {
        console.log('Rich Presence: Active')
        rpc_client.request('SET_ACTIVITY', {
            pid: process.pid,
            activity: {
                details: Details,
                state: State,
                assets: {
                    large_image: LargeImage,
                    large_text: LargeImageText,
                    small_image: SmallImage,
                    small_text: SmallImageText,
                },
                buttons: [
                {
                    label: Button1,
                    url: Url1
                },
                {
                    label: Button2,
                    url: Url2
                },
                ]
            }
        })
    },

};
