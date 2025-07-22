import React, { useEffect } from 'react';

const CozeChat = () => {
    useEffect(() => {
        // Tạo thẻ script
        const script = document.createElement('script');
        script.src = 'https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.2.0-beta.6/libs/oversea/index.js';
        script.async = true;

        script.onload = () => {

            new window.CozeWebSDK.WebChatClient({
                config: {
                    bot_id: '7528210636141199376',
                },
                componentProps: {
                    title: 'Coze',
                },
                auth: {
                    type: 'token',
                    token: `${process.env.REACT_APP_COZE_API_PAT}`,
                    onRefreshToken: function () {
                        return `${process.env.REACT_APP_COZE_API_PAT}`;
                    },
                },
            });
        };

        document.body.appendChild(script);

        // Cleanup khi component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; // hoặc <div id="coze-chat" /> nếu cần gắn vào 1 div cụ thể
};

export default CozeChat;
