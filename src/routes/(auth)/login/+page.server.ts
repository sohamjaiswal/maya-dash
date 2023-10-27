import { fail, redirect } from '@sveltejs/kit'

import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { handleIdLoginRedirect } from '$lib/utils/loginredirect';

const linkGuildedSchema = z.object({
  guildedId: z.string(),
});

export const load = async () => {
  // Server API:
  const form = await superValidate(linkGuildedSchema);

  // Always return { form } in load and form actions.
  return { form };
};

export const actions = {
	linkGuilded: async ({ request, url }) => {
		const data = await request.formData()
		const guildedId = data.get('guildedId')

		if (
			 !guildedId  || typeof guildedId !== 'string'
		) {
			return fail(400, { invalid: true })
		}

    const redirectTo = url.searchParams.get('redirectTo') || '';
    console.log(url)
    // successfully redirect to userId path of login flow
    // throw redirect(302, `/login/${guildedId}`);
    throw redirect(302, handleIdLoginRedirect(guildedId, redirectTo))
	},
}
