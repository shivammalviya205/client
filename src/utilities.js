// Sort by likes
 export  function sortByLikes(posts) {
    return posts.sort((postA, postB) => {
      const numLikesA = Object.keys(postA.likes).length;
      const numLikesB = Object.keys(postB.likes).length;
      return numLikesB - numLikesA; // sort in descending order by number of likes
    });
  }
  
  // Sort by date
  export async function sortByDate(posts) {
    return posts.sort((postA, postB) => {
      const dateA = new Date(postA.createdAt);
      const dateB = new Date(postB.createdAt);
      return dateB - dateA; // sort in descending order by creation date
    });
  }
  