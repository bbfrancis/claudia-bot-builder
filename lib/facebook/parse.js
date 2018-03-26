'use strict';

module.exports = function(messageObject) {
  messageObject = messageObject || {};

  if (messageObject.sender && messageObject.sender.id && messageObject.message && messageObject.message.text && !messageObject.message.quick_reply &&
    (typeof messageObject.delivery !== 'object' && typeof messageObject.read !== 'object' && (!messageObject.message || !messageObject.message.is_echo))) { // Disable delivery and read reports and message echos
    return {
      sender: messageObject.sender.id,
      text: messageObject.message.text,
      originalRequest: messageObject,
      type: 'facebook'
    };
  }
  else if (messageObject.sender && messageObject.sender.id && messageObject.postback && messageObject.postback.payload) {
    return {
      sender: messageObject.sender.id,
      text: messageObject.postback.payload,
      originalRequest: messageObject,
      postback: true,
      type: 'facebook'
    };
  }
  else if (messageObject.sender && messageObject.sender.id && messageObject.message && messageObject.message.quick_reply && messageObject.message.quick_reply.payload) {
    return {
      sender: messageObject.sender.id,
      text: messageObject.message.quick_reply.payload,
      originalRequest: messageObject,
      postback: true,
      type: 'facebook'
    };
  }
  else if (messageObject.sender && messageObject.sender.id &&
    (typeof messageObject.delivery !== 'object' && typeof messageObject.read !== 'object' && (!messageObject.message || !messageObject.message.is_echo))) { // Disable delivery and read reports and message echos
    return {
      sender: messageObject.sender.id,
      text: (messageObject.message && messageObject.message.text) ? messageObject.message.text : '',
      originalRequest: messageObject,
      type: 'facebook'
    };
  }
  else if (messageObject.optin && messageObject.optin.ref && messageObject.optin.user_ref) { // Checkbox Plug-in
    return {
      sender: messageObject.optin.user_ref,
      text: '',
      ref: messageObject.optin.ref,
      originalRequest: messageObject,
      type: 'facebook'
    };
  } else if (messageObject.pass_thread_control) { // Pass thread control handover event 
    return {
      sender: messageObject.sender.id,
      handoverEvent: 'pass_thread_control',
      type: 'facebook',
      metadata: messageObject.pass_thread_control.metadata,
      newOwnerAppId: messageObject.pass_thread_control.new_owner_app_id
    }
  } else if (messageObject.take_thread_control) { // Take thread control handover event
    return {
      sender: messageObject.sender.id,
      handoverEvent: 'take_thread_control',
      type: 'facebook',
      metadata: messageObject.take_thread_control.metadata,
      previousOwnerAppId: messageObject.take_thread_control.previous_owner_app_id,
    }
  } else if (messageObject.request_thread_control) { // Request thread control handover event
    return {
      sender: messageObject.sender.id,
      handoverEvent: 'request_thread_control',
      type: 'facebook',
      metadata: messageObject.request_thread_control.metadata,
      requestedOwnerApId: messageObject.request_thread_control.requested_owner_app_id
    }
  }
};
