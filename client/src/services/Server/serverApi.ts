import { apiInstance } from "./axiosConfig";
import { useState } from "react";
import axios from 'axios';
import { Transaction } from "../types";



export const getTransactions = async (userId: string): Promise<Transaction[]> => {
	try {
	  const response = await axios.get(`/api/get?user_id=${userId}`);
	  return response.data;  // Return the transaction data
	} catch (error) {
	  console.error("Error fetching transactions:", error);
	  return [];  // Return an empty array in case of an error
	}
  };

export const addPayment = async (username: string, amount: Number, description: string): Promise<any> => {
	return await apiInstance.post('transactions', {
		username: username,
		amount: amount,
		description: description
	});
}

export const resolvePayment = async (paymentId: string) => {
	return await apiInstance.put(`transactions/${paymentId}`, {
		resolved: true
	});
}

export const parseReceipt = async (receiptFile: File): Promise<number>  => {
	const formData = new FormData();
	formData.append("receiptFile", receiptFile);

	const res = await apiInstance.post('parseReceipt', formData);
	
	return res.data.final_total;
}