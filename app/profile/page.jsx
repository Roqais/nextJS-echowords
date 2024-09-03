'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import ConfirmationModal from "@components/ConfirmationModal"; // Import the modal

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [postToDelete, setPostToDelete] = useState(null); // State to track which post to delete

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const openModal = (post) => {
    setPostToDelete(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPostToDelete(null);
  };

  const handleDelete = async () => {
    try {
      await fetch(`/api/prompt/${postToDelete._id.toString()}`, {
        method: "DELETE",
      });

      const filteredPosts = myPosts.filter((item) => item._id !== postToDelete._id);

      setMyPosts(filteredPosts);
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Profile
        name='My'
        desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={openModal} // Use openModal to trigger the confirmation modal
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this prompt?"
      />
    </>
  );
};

export default MyProfile;
