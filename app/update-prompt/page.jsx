"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import {Suspense} from "react";

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const getPromptDetails = async () => {
            try {
                if (!promptId) throw new Error('Prompt ID is missing');
                const response = await fetch(`/api/prompt/${promptId}`);
                if (!response.ok) throw new Error('Failed to fetch prompt details');
                const data = await response.json();
                setPost({
                    prompt: data.prompt,
                    tag: data.tag
                });
            } catch (error) {
                setError('Failed to load prompt details');
                console.error(error);
            }
        };

        getPromptDetails();
    }, [promptId]);

    const updatePrompt = async (e) => {
        e.preventDefault();

        if (!post.prompt || !post.tag) {
            setError('Prompt and tag are required');
            return;
        }

        setSubmitting(true);
        setError('');

        if (!promptId) {
            setError('Prompt ID not found');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (!response.ok) throw new Error('Failed to update prompt');

            router.push('/');
        } catch (error) {
            setError('Failed to update prompt');
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={updatePrompt}
            />
        </div>
    );
};

export default EditPrompt;
