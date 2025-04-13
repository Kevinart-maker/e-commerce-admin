import axios from "axios";
import { useEffect, useState } from "react";

interface Review {
  _id: string;
  user: string;
  comment: string;
  rating: number;
  createdAt: string;
}

interface ReviewProps {
  id: string;
}

export default function Review({ id }: ReviewProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get<Review[]>(
          `https://etemplate-backend.vercel.app/api/products/${id}/reviews`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium">Reviews</h1>
      <div className="flex flex-col gap-4 mt-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col gap-2 p-4 border-b-[1px] border-gray-300"
          >
            <h1 className="text-lg font-medium">{review.user}</h1>
            <p>{review.comment}</p>
            <p>{review.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}