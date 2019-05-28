import React, { useState, useEffect, useReducer } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

let feedState = null

const usePostsState = () => {
  return useReducer(
    (state, action) => {
      switch (action.type) {
        case "SHOW_MORE":
          return { ...state, resultLimit: state.resultLimit + 3 }
        case "SHOW_NEW_POSTS":
          return {
            ...state,
            resultLimit: state.resultLimit + state.newPosts.length,
            postTime: Date.now()
          }
        case "SET_POSTS":
          return { ...state, posts: action.posts }
        case "SET_NEW_POSTS":
          return { ...state, posts: action.posts }
        default:
          return state
      }
    },
    feedState || {
      resultLimit: 3,
      postTime: Date.now(),
      posts: [],
      newPosts: []
    }
  )
}

function useFeedPosts() {
  // const [resultLimit, setResultLimit] = useState(3)
  // const [postTime, setPostTime] = useState(Date.now())
  // const [posts, setPosts] = useState([])
  // const [newPosts, setNewPosts] = useState([])

  const state = usePostsState()
  const [{ posts, resultLimit, postTime, newPosts }, dispatch] = state

  useEffect(() => {
    feedState = state[0]
  })

  function showMore() {
    dispatch({ type: "SHOW_MORE", resultLimit: resultLimit + 3 })
  }

  function showNewPosts() {
    dispatch({
      type: "SHOW_NEW_POSTS",
      resultLimit: resultLimit + newPosts.length
    })
  }

  useEffect(() => {
    return subscribeToNewFeedPosts(postTime, posts => {
      dispatch({ type: "SET_NEW_POSTS", posts })
    })
  }, [dispatch, postTime])

  useEffect(() => {
    let waitingOnData = true
    loadFeedPosts(postTime, resultLimit).then(posts => {
      if (waitingOnData) {
        dispatch({ type: "SET_POSTS", posts })
      }
    })

    return () => (waitingOnData = false)
  }, [dispatch, postTime, resultLimit])

  return { posts, newPosts, showMore, showNewPosts }
}

function Feed() {
  const { posts, newPosts, showMore, showNewPosts } = useFeedPosts()

  return (
    <div className="Feed">
      {newPosts.length > 0 ? (
        <div className="Feed_button_wrapper">
          <button
            className="Feed_new_posts_button icon_button"
            onClick={showNewPosts}
          >
            View {newPosts.length} New Posts
          </button>
        </div>
      ) : null}

      {posts.map(post => {
        return <FeedPost key={post.id} post={post} />
      })}

      <div className="Feed_button_wrapper">
        <button
          className="Feed_new_posts_button icon_button"
          onClick={showMore}
        >
          View More
        </button>
      </div>
    </div>
  )
}
