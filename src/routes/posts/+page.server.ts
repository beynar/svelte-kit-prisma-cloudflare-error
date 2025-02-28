import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	return redirect(302, '/');
};
