import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            member_name,
            family_members_12_plus,
            family_members_under_12,
            mobile_number,
            payment_method,
            total_amount,
            transaction_mobile,
            transaction_id
        } = body;

        // Server-side validation
        if (!member_name || !mobile_number || !payment_method || !total_amount) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('registrations')
            .insert([
                {
                    member_name,
                    family_members_12_plus,
                    family_members_under_12,
                    mobile_number,
                    payment_method,
                    total_amount,
                    transaction_mobile,
                    transaction_id
                },
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to save registration' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Registration successful', data },
            { status: 201 }
        );
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
