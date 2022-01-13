const Subscription = {
  
  userEventCreate: {
    subscribe: (parent, args, { pubSub }) => {
      console.log("hi")
      return pubSub.asyncIterator("USER_EVENT_CRATE");
    },
  },

};

export default Subscription;
