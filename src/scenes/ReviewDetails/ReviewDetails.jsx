import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Box,
  CircularProgress,
  Paper,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";

import { fetchReviewById } from "../../data/api_handlers";

const ReviewDetails = () => {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [newReviewData, setNewReviewData] = useState([]);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetchReviewById(reviewId);

        setReview(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReview();
  }, [reviewId, newReviewData]);

  if (!review) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      width="60%"
      height="40%"
      m="0 auto"
      px="5px"
      pt="10px"
      display="flex"
      justifyContent="center"
      flexDirection={"column"}
      backgroundColor={colors.primary[400]}
      borderRadius="4px"
    >
      <Typography
        variant="h4"
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
      >
        Review Details
      </Typography>
      <Box
        width="60%"
        m="0 auto"
        p="5px"
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        gap={"10px"}
      >
        <Typography color={colors.grey[100]}>
          <strong>ID:</strong> {review.id}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Score:</strong> {review.score}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>UserId:</strong> {review.user_id}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Reports for Inapropriate:</strong> {review.isInapropriate}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Reports for Inaccuracy:</strong> {review.isNotAccurate}
        </Typography>
        <Typography color={colors.grey[100]}>
          <strong>Review Content:</strong>
          {review.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ReviewDetails;
