"use client";
import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams, useRouter } from "next/navigation";
import Nav from "../../../components/commonComp/Nav"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartSupported, faClose } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faPaperPlane as faShareNodesRegular } from "@fortawesome/free-regular-svg-icons";
import { FaWhatsapp, FaInstagram, FaTwitter, FaCopy } from "react-icons/fa";
import "../../styles/Community.css"
import MoonLoader from "react-spinners/MoonLoader";
import { auth } from "@/function-apis/firebaseConfig";



function Post() {

    const router = useRouter();
    const { postId } = useParams();
    const [post, setPost] = useState<any>({});
    const [supportsCount, setSupportsCount] = useState(0);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [supportedPostIds, setSupportedPostIds] = useState<any>([])
    
    const [theme, settheme] = useState<any>();
    useEffect(() => {
        let themeVal = localStorage.getItem("theme")
        settheme(themeVal)
    }, [])

    useEffect(() => {
            console.log(auth)
            fetchAllsupportedIds();
    }, [auth, auth?.currentUser]);

async function fetchAllsupportedIds() {
    try {
        await fetch(`/api/getSupportedPostsId?email=${auth.currentUser.email}`)
            .then(async (res : Response)=>{
                const data = await res.json()
                setSupportedPostIds(data?.supported);
            })
    } catch (error) {
        console.error('Error:', error);
    }
};

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await fetch(`/api/post?id=${postId}`, {
                    method: 'GET',
                });

                if (response.status === 200) {
                    const data = await response.json();
                    setPost(data);
                    setSupportsCount(data.supports);
                } else {
                    throw new Error(`Failed to fetch post data (Status: ${response.status})`);
                }
            } catch (error) {
                console.error(error);
                // Handle the error
            }
        };

        fetchPostData();
    }, [postId]);

    const isPostSupported = (postId : any) => {
        return supportedPostIds?.includes(postId);
    };

    const supportPost = (postId : string) => {
        console.log("support post")
        if (isPostSupported(postId)) {
            // If the post is already supported, call the endpoint to un-support it

            fetch(`/api/notSupportPost?id=${postId}&email=${auth?.currentUser?.email}`, {
                method: 'PUT',
            })
                .then((response) => {
                    if (response.status === 200) {
                        // Update the supportedPostIds state and store it in localStorage
                        const updatedSupportedPostIds = supportedPostIds.filter((id : string) => id !== postId);
                        setSupportedPostIds(updatedSupportedPostIds);

                        setSupportsCount(prev => prev>0 ? prev-1 : 0)

                        // FetchPosts();
                    } else {
                        // Handle the case where un-supporting failed (e.g., show an error message).
                        console.error('Error:', response);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            // If the post is not supported, call the endpoint to support it

            fetch(`/api/supportPost?id=${postId}&email=${auth?.currentUser?.email}`, {
                method: 'PUT',
            })
                .then((response) => {
                    if (response.ok) {
                        // Update the supportedPostIds state and store it in localStorage
                        const updatedSupportedPostIds = [...supportedPostIds, postId];
                        setSupportedPostIds(updatedSupportedPostIds);
                        
                        setSupportsCount((prev)=>prev+1)
                        // Refresh the list of posts
                        // FetchPosts();
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    const shareOnWhatsApp = () => {
        const postLink = `https://soulmind.vercel.app/post/${postId}`;
        const whatsappMessage = `Check out this post on SoulMind: ${postLink}`;

        const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappShareLink, '_blank');
    };

    const shareOnInstagram = () => {
        const postLink = `https://soulmind.vercel.app/post/${postId}`;
        const instagramShareLink = `https://www.instagram.com/share?url=${encodeURIComponent(postLink)}`;

        window.open(instagramShareLink, '_blank');
    };

    const shareOnTwitter = () => {
        const postLink = `https://soulmind.vercel.app/post/${postId}`;
        const tweetText = "Check out this post on SoulMind!";

        const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(postLink)}`;

        window.open(twitterShareLink, '_blank');
    };

    const copyLink = () => {
        const postLink = `https://soulmind.vercel.app/post/${postId}`;

        const tempInput = document.createElement('input');
        tempInput.value = postLink;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        alert('Post link copied to clipboard!');
    };

    return (
        <>
            <Nav />
            <div className={theme + " postPage"}>
                <div className={theme + " post"}>
                    <button className="BackBTNPost" onClick={() => { router.push("/community") }}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className={theme + " posthead"}>
                        <img src="/images/defpp.jpg" alt="" />
                        <p style={{ margin: "0px" }} className="name">
                            Anonymous
                            {/* {"User" + Math.floor(Math.random() * 1000000)} */}
                        </p>
                    </div>
                    {!post?.story && <div className="flex justify-center">
                        <MoonLoader color={theme=="dark" ? "#ffffff" : "#000"} size={35}/>
                    </div>}
                    <div className="post_content">
                        <p className={theme + " post_text"}>{post.story}</p>
                    </div>
                    <div
                        className="post_actions"
                        style={{ width: "100%", height: " 44px", background: "" }}
                    >
                        <div className="supports">
                            {isPostSupported(post?._id) ? (
                                
                                <FontAwesomeIcon
                                    className={theme + " supportIcon"}
                                    icon={faHeartSupported}
                                    style={{ fontSize: "25px", color: "#f55656" }}
                                    onClick={()=>{supportPost(post._id)}}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    className={theme + " supportIcon"}
                                    icon={faHeart}
                                    style={{ fontSize: "25px" }}
                                    onClick={()=>{supportPost(post._id)}}
                                />
                            )}
                            <div className={theme + " noOfSupports"} style={{ fontSize: "10px" }}>
                                {supportsCount}
                            </div>
                        </div>
                        <div className="sendStory">
                            <FontAwesomeIcon
                                className={theme + " sendIcon"}
                                icon={faShareNodesRegular}
                                style={{ fontSize: "22px" }}
                                onClick={() => setShowSharePopup(true)}
                            />
                        </div>
                    </div>
                </div>


                {showSharePopup && (
                    <div className="share-popup">
                        <div className={theme + " share-popup-content"}>
                            <span className="close" onClick={() => setShowSharePopup(false)}>
                                <FontAwesomeIcon icon={faClose} />
                            </span>
                            <h3>Share Post</h3>
                            <p>Share this post with others:</p>
                            <button onClick={shareOnWhatsApp}>
                                <FaWhatsapp /> Share on WhatsApp
                            </button>
                            {/* <button onClick={shareOnInstagram}>
                                <FaInstagram /> Share on Instagram
                            </button> */}
                            <button onClick={shareOnTwitter}>
                                <FaTwitter /> Share on Twitter
                            </button>
                            <button onClick={copyLink}>
                                <FaCopy /> Copy Post Link
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Share Post Popup */}

        </>
    );
}

export default Post;