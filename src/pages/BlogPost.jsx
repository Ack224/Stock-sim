import { useParams } from "react-router-dom";
import { posts } from "/data/posts";
export default function BlogPost() {
    const { postId } = useParams()
    const fetchPost = (id) => posts.find(p => p.id == parseInt(id))
    const post = fetchPost(postId)
    return (
        <div>
            <h1>{post.title}</h1>

            <p> <small style={{ color: '#666' }}>autor: {post.author}</small></p>

            <p>
                {post.content}
            </p>
        </div>
    );
}